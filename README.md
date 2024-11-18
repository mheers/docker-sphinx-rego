# docker-sphinx-rego

> [sphinx-rego](https://github.com/zenitysec/sphinx-rego) with [opa](https://github.com/open-policy-agent/opa) in a container based on [sphinx](https://github.com/sphinx-doc/sphinx)

## Usage

```bash
docker run -it --rm mheers/sphinx-rego
```

## Build

```bash
cd ci/

export $(cat .env | xargs)
dagger call build-and-push-image --src ../ --registry-token=env:REGISTRY_ACCESS_TOKEN
```
