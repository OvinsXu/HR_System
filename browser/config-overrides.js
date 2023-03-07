const path = require('path');

const paths = require("react-scripts/config/paths");
paths.appBuild = path.join(path.dirname(paths.appBuild), "../Server/src/main/resources/static");
//config.output.path = path.join(path.dirname(config.output.path), "dist");
