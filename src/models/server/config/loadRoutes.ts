import { Express, Router} from "express";
import path from "path";
import fs from "fs";

const loadRoutes = (app: Express): void => {
  // Get the path of the routes folder.
  const routesPath: string = path.join(__dirname, "../../../routes");
  const routeFiles: string[] = fs.readdirSync(routesPath).map((file: string) => path.parse(file).name);

  // Loop through the files and require them.
  routeFiles.forEach((routeFile: string) => {
    const { name: slug }: path.ParsedPath = path.parse(routeFile);
    const route: Router = require(path.join(routesPath, routeFile)).default;

    console.log(`Route loaded: ${slug}`)
    const routePath: string = `/api/${slug}`;
    app.use(routePath, route);
  });
};

export default loadRoutes;