import { Connector, IpAddressTypes } from '@google-cloud/cloud-sql-connector';

export const clientOpts = async () => {
  const connector = new Connector();
  return await connector.getOptions({
    instanceConnectionName: process.env.INSTANCE_NAME as string,
    ipType: IpAddressTypes.PRIVATE,
  });
};
