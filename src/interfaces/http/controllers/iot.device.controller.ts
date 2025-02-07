import { Request, Response, NextFunction } from "express";
import { CreateIotDeviceUseCase } from "../../../application/use-cases/iot-device/create.iot.device.usecase";
import { IotDeviceRepository } from "../../../domain/repositories/iot.device.repository";
import { logger } from "../../../utils/logging";
import { FindIotDeviceUseCase } from "../../../application/use-cases/iot-device/find.iot.device.usecase";
import { IotDeviceSortBy } from "../../../domain/types/types/ios.device.type";
import { SortOrder } from "../../../domain/types/types/repository.type";
import { mapExpressRequestToFilters } from "../../../utils/express/map.express.request.to.filters.util";

export class IotDeviceController {
    constructor(private readonly repository: IotDeviceRepository) {}
    
    async create (req: Request, res: Response, next: NextFunction) : Promise<void>  {
        try {
            
            logger.debug('Enter IotDeviceController.create()')
            const createUseCase = new CreateIotDeviceUseCase(this.repository)
            const {
                name,
                type,
                metadata
            } = req.body; 

            const iotDevice = await createUseCase.execute(name, type, metadata);

            res.status(201).json({ message: "Device created successfully", iotDevice });
        } catch (error) {
            next(error)
        }
    }

    async find (req: Request, res: Response, next: NextFunction) : Promise<void>  {
        try {
            
            logger.debug('Enter IotDeviceController.find()')
            const queryParams = req.query;

            const sortBy = queryParams.by
            delete queryParams.by;

            const sortOrder = queryParams.order
            delete queryParams.order;

            const pageNumber = queryParams.page_number ?? 1;
            delete queryParams.page_number;

            const pageSize = queryParams.page_size ?? 10;
            delete queryParams.page_size;

            const findUseCase = new FindIotDeviceUseCase(this.repository)

            const iotDevices = await findUseCase.execute({
                filters: mapExpressRequestToFilters(queryParams),
                sortBy: sortBy as keyof IotDeviceSortBy,
                sortOrder: sortOrder as SortOrder,
                pageNumber: Number(pageNumber),
                pageSize: Number(pageSize)
            });

            res.status(200).json(iotDevices);
        } catch (error) {
            next(error)
        }
    }

}