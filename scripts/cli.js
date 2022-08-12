const fs = require("fs/promises");
const path = require("path");
const ergogen = require("ergogen");
const yaml = require("js-yaml");
const yargs = require("yargs");
const debounce = require("lodash.debounce");

const args = yargs
  .option("output", {
    alias: "o",
    default: path.resolve("output"),
    describe: "Output folder",
    type: "string",
  })
  .option("footprints", {
    alias: "f",
    describe: "Additional footprints folder",
    type: "string",
  })
  .option("watch", {
    alias: "w",
    describe: "Watch for changes to config",
    type: "boolean",
  })
  .option("debug", {
    alias: "d",
    default: false,
    describe: "Debug mode",
    type: "boolean",
  })
  .option("clean", {
    default: false,
    describe: "Clean output dir before parsing",
    type: "boolean",
  }).argv;

function exitError() {
  console.error("Usage: ergogen <config> [options]");
  yargs.showHelp();
  process.exit(1);
}

const configPath = args._[0];
if (!configPath) {
  exitError();
}

const ensureDir = (dirPath) =>
  fs.mkdir(path.dirname(dirPath), { recursive: true });

async function build(configFile, outputPath, debug = false) {
  try {
    await fs.stat(configPath);
  } catch {
    console.log(`Could not find config at path ${configPath}`);
    exitError();
  }

  const absoluteOutputPath = path.resolve(outputPath);

  if (args.footprints) {
    const footprints = path.resolve(args.footprints);
    const footprintDirFiles = await fs.readdir(footprints);
    for (let index = 0; index < footprintDirFiles.length; index++) {
      const file = footprintDirFiles[index];
      if (file.endsWith(".js")) {
        const name = path.basename(file, ".js");
        const footprintFile = path.resolve(footprints, file);
        delete require.cache[footprintFile];
        const footprint = require(footprintFile);
        ergogen.inject_footprint(name, footprint);
      }
    }
  }

  if (args.clean) {
    console.log("Cleaning output folder...");
    await fs.rm(outputPath, { recursive: true, force: true });
  }

  const config = await fs.readFile(path.resolve(configFile), {
    encoding: "utf8",
  });
  const result = await ergogen.process(config, debug, (s) => console.log(s));

  const single = async (data, relativePath) => {
    if (!data) return;
    const absolutePath = path.resolve(absoluteOutputPath, relativePath);
    await ensureDir(absolutePath);

    if (absolutePath.endsWith(".yaml")) {
      await fs.writeFile(absolutePath, yaml.dump(data, { indent: 2 }));
    } else {
      await fs.writeFile(absolutePath, data);
    }
  };

  const composite = async (data, relativePath) => {
    if (!data) return;
    const absolutePath = path.resolve(absoluteOutputPath, relativePath);

    for (const format of ["svg", "dxf", "jscad", "stl", "yaml"]) {
      if (data[format]) {
        await single(data[format], `${absolutePath}.${format}`);
      }
    }
  };

  console.log("Writing output to disk...");
  await ensureDir(outputPath);

  if (debug) {
    single(JSON.stringify(result, null, 2), "result.json");
  }

  single(result.raw, "source/raw.txt");
  single(result.canonical, "source/canonical.yaml");

  single(result.units, "points/units.yaml");
  single(result.points, "points/points.yaml");
  composite(result.demo, "points/demo");

  for (const [name, outline] of Object.entries(result.outlines)) {
    composite(outline, `outlines/${name}`);
  }

  for (const [name, _case] of Object.entries(result.cases)) {
    composite(_case, `cases/${name}`);
  }

  for (const [name, pcb] of Object.entries(result.pcbs)) {
    single(pcb, `pcbs/${name}.kicad_pcb`);
  }
}

async function run(params) {
  await build(configPath, args.output, args.debug);

  if (args.watch) {
    const debounceBuild = debounce(build, 100);

    async function watch() {
      try {
        const watcher = fs.watch(configPath);
        // watcher will fire multiple times wile config is written to disk.
        // use a debounce to wait for file to settle
        for await (const event of watcher) {
          await debounceBuild(configPath, args.output, args.debug);
        }
      } catch (error) {
        console.log(error);
        watch();
      }
    }

    process.on("uncaughtException", (error) => {
      console.log(error);
      watch();
    });

    watch();
  }
}

run();
