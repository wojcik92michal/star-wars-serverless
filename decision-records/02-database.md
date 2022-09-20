# Problem

What database should be used, relational or NoSql.

# Decision

There was a decision to use NoSQL from AWS Stack - `DynamoDB`. Reasons:

- quick setup, works fine with `Serverless` framework
- serverless plugin that allows to run this db locally with small effort of work (`serverless-dynamodb-local`)
- relational database might be an overkill for requirements - the expected data structure seems to be simple and the amount of stored data should not be high
- learning purposes - the author have never worked with `DynamoDB`

# Conclusions after implementation

The setup process was very quick, `serverless-dynamodb-local` is a nice tool. Unfortunately, the problem appeared when implementing pagination functionality - it become very problematic and required some workarounds (adding const field to a model for a sort index). It was not a big deal fot this table (as it was mentioned before - amount of stored data in this table should not be high), but it would become more problematic when e.g. other different pagination that cursor pagination would be required.

Depending on the future requirements, maybe it would be good to consider the relational DB.
