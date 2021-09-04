import process from 'process';
import { Metadata, credentials } from '@grpc/grpc-js';

import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { CollectorTraceExporter } from '@opentelemetry/exporter-collector-grpc';

// @FIXME: Remove magic strings
const metadata = new Metadata();
metadata.set('x-honeycomb-team', '3f052e63880be5cbde69b42548aa9c08');
metadata.set('x-honeycomb-dataset', 'diary');
const traceExporter = new CollectorTraceExporter({
  url: 'grpc://api.honeycomb.io:443/',
  credentials: credentials.createSsl(),
  metadata,
});

export default new NodeSDK({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'diary-core',
  }),
  traceExporter,
  instrumentations: [getNodeAutoInstrumentations()],
});
