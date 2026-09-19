import { readFileSync } from "fs";
import { Client } from "ssh2";

function parseArgs(argv) {
  let identity = "";
  const rest = [];
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "-i") {
      identity = argv[i + 1] ?? "";
      i += 1;
      continue;
    }
    if (arg === "-o") {
      i += 1;
      continue;
    }
    if (arg.startsWith("-")) continue;
    rest.push(arg);
  }
  const target = rest[0] ?? "";
  const at = target.lastIndexOf("@");
  return {
    identity,
    username: at >= 0 ? target.slice(0, at) : "git",
    host: at >= 0 ? target.slice(at + 1) : target,
    command: rest.slice(1).join(" "),
  };
}

const { identity, username, host, command } = parseArgs(process.argv.slice(2));
if (!identity || !host || !command) {
  console.error("minutes-ssh: missing identity, host, or command");
  process.exit(1);
}

const client = new Client();
client
  .on("ready", () => {
    client.exec(command, (error, stream) => {
      if (error) {
        console.error(error.message);
        client.end();
        process.exit(1);
        return;
      }
      process.stdin.pipe(stream);
      stream.pipe(process.stdout);
      stream.stderr.pipe(process.stderr);
      stream.on("close", (code) => {
        client.end();
        process.exit(code ?? 0);
      });
    });
  })
  .on("error", (error) => {
    console.error(error.message);
    process.exit(1);
  })
  .connect({
    host,
    username,
    privateKey: readFileSync(identity),
    readyTimeout: 20000,
  });
