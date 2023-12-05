import { Request, Response } from "express";
import { enviroment } from "../../app/common/config";

export const infoController = function (req: Request, res: Response) {
	const { system } = enviroment;
	const { platform, uptime, cpus, network_interfaces } = system;
	const info = {
		platform,
		uptime,
		network_interfaces,
		cpus,
		user_agent: req.useragent,
	};
	res.status(200).send({ message: "Server info", info });
};

export const healthController = function (_: Request, res: Response) {
	res.status(200).send({ message: "Online" });
};
