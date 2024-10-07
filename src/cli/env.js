
const parseEnv = () => {
  const envVariables = process.env;

  const filteredEnvVariables = Object.keys(envVariables)
    .filter((key) => key.startsWith("RSS_"))
    .map((key) => `${key}=${envVariables[key]}`)
    .join("; ");

  console.log(filteredEnvVariables);
};

parseEnv();
