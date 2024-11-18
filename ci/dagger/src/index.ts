/**
 * A generated module for Ci functions
 *
 * This module has been generated via dagger init and serves as a reference to
 * basic module structure as you get started with Dagger.
 *
 * Two functions have been pre-created. You can modify, delete, or add to them,
 * as needed. They demonstrate usage of arguments and return types using simple
 * echo and grep commands. The functions can be called from the dagger CLI or
 * from one of the SDKs.
 *
 * The first line in this comment block is a short description line and the
 * rest is a long description with more detail on the module's purpose or usage,
 * if appropriate. All modules should have a short description.
 */
import { dag, object, func, Secret } from "@dagger.io/dagger"

const username = "mheers"

const baseImage = "sphinxdoc/sphinx:8.1.3"
const targetImage = "docker.io/mheers/sphinx-rego:latest"
const opaVersion = "0.69.0"

@object()
export class Ci {
  @func()
  async buildAndPushImage(registryToken: Secret): Promise<string> {
    return dag.container().from(baseImage)

      // update package list
      .withExec(["apt-get", "update"])

      // install wget
      .withExec(["apt-get", "install", "-y", "wget"])

      // Install sphinx-rego
      .withExec(["pip3", "install", "sphinx-rego"])

      // Install opa
      .withExec(["wget", "-O", "/usr/bin/opa", `https://openpolicyagent.org/downloads/v${opaVersion}/opa_linux_amd64_static`])
      .withExec(["chmod", "+x", "/usr/bin/opa"])

      // Push the image
      .withRegistryAuth(targetImage, username, registryToken)
      .publish(targetImage)
  }
}
