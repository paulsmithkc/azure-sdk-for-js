// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @internal
 */
export function getHeaderName(): string {
  return "User-Agent";
}

/**
 * @internal
 */
export async function setPlatformSpecificData(map: Map<string, string>): Promise<void> {
	const os = await import("node:os").catch(() => undefined);
	const process = await import("node:process").catch(() => undefined);

  if (process) {
	  const versions = process.versions as Record<string, string | undefined>;
	  if (versions.bun) {
	    map.set("Bun", versions.bun);
	  } else if (versions.deno) {
	    map.set("Deno", versions.deno);
	  } else if (versions.node) {
	    map.set("Node", versions.node);
	  }
	}

	if (os) {
  	map.set("OS", `(${os.arch()}-${os.type()}-${os.release()})`);
	}
}
