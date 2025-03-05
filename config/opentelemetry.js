const { NodeTracerProvider } = require('@opentelemetry/sdk-trace-node');

const { ConsoleSpanExporter, SimpleSpanProcessor } = require('@opentelemetry/sdk-trace-base');


exports.setupTelemetry = () => {
  const provider = new NodeTracerProvider();

  provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));
  provider.register();
  console.log('OpenTelemetry initialized');
};

