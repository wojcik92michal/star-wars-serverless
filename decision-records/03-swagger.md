# Problem

How to setup Swagger and define its properties

# Decision

The `serverless-auto-swagger` plugin was used. Couldn't find a better alternative that would be designed for `serverless` and worked fine out of the box. What is important to mention is the fact that some popular plugins (like `serverless-aws-documentation`) are not supported any more.

`serverless-auto-swagger` allows to autogenerate Swagger models from TS models and makes creating swagger definition quite easy. What is more, it setups Swagger out-of-the-box. It has some drawback (e.g. does not allow to add more advanced metadata to models), but seems to be a good choice.
