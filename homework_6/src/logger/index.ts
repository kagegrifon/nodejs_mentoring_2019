import winston, { format } from 'winston';

const { combine, label, json } = format;

export const winstonContainer = new winston.Container();
const infoFileTransport = new winston.transports.File({ filename: 'info.log' });
const errorsFileTransport = new winston.transports.File({ filename: 'errors.log' });

const consoleFormat = format.combine(
  format.colorize(),
  format.simple()
);

winstonContainer.add('exceptionLogger', {
  level: 'error',
  format: combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    label({ label: 'Exception log' }),
    json()
  ),
  transports: [
    new winston.transports.Console({ 
      level: 'error',
      format: consoleFormat
    }),
    errorsFileTransport,
  ]
});

winstonContainer.add('infoLogger', {
  level: 'info',
  format: combine(
    format.splat(),
    format.json()
  ),
  transports: [
    infoFileTransport,
    new winston.transports.Console({
      level: 'info',
      format: consoleFormat
    })
  ]
});

winstonContainer.add('errorLogger', {
  level: 'warn',
  format: combine(
    format.splat(),
    format.json()
  ),
  transports: [
    new winston.transports.Console({
       level: 'warn',
       format: consoleFormat,
    }),
    infoFileTransport,
  ]
});

export const infoLogger = winstonContainer.get('infoLogger');
export const exceptionLogger = winstonContainer.get('exceptionLogger');
export const errorLogger = winstonContainer.get('errorLogger');

export const serverInfoLoggerHandler  = (req:any, res:any, next:any) => {
  infoLogger.info({
    message: 'Server hangle',
    req,
    res,
  });

  next();
};

interface getLoggerParams {
  logger: winston.Logger,
  level: string;
  layer: string;
}

export const getRouterErrorLogger = ({ logger, level, layer}: getLoggerParams) => {
  return (message: string, req: any, res: any, error: Error) => {
    logger.log({
      message,
      error,
      level,
      layer,
      method: req.method,
      params: { req, res },
    });
  }
};

export const getCommonLogger = ({ logger, level, layer}: getLoggerParams) => {
  return (message: string, ...rest: any) => {
    logger.log({
      message,
      level,
      layer,
      ...rest
    });
  }
};
