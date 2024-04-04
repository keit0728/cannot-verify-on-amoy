const { ethers, upgrades, run } = require("hardhat");

const main = async () => {
  const name = "TestProxy";

  console.log("---------------------------------------------");
  console.log(`Start ${name} Deploy`);
  console.log("---------------------------------------------");
  console.log("");

  console.log("Deploy --------------------------------------");

  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with account: ", deployer.address);

  const Contract = await ethers.getContractFactory(name);
  const proxy = await upgrades.deployProxy(Contract, [], {
    kind: "uups",
    initializer: "initialize",
  });
  await proxy.waitForDeployment();
  const proxyAddress = await proxy.getAddress();
  console.log(`${name} proxy deployed to: ${proxyAddress}`);
  console.log(
    `impl deployed to: ${await upgrades.erc1967.getImplementationAddress(
      proxyAddress
    )}`
  );

  console.log("Verify --------------------------------------");

  // Wait 15 seconds because verifying immediately after deployment is completed will fail.
  console.log("Waiting for 15 seconds before verification...");
  await new Promise((resolve) => setTimeout(resolve, 15000));

  try {
    await run("verify:verify", {
      address: proxyAddress,
      constructorArguments: [],
    });
  } catch (e) {
    console.log(e);
  }

  console.log("");
  console.log("---------------------------------------------");
  console.log(`End ${name} Deploy`);
  console.log("---------------------------------------------");
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
