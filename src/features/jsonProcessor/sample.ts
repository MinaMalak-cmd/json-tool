/** A demo document showcasing nested, stringified JSON payloads. */
export const SAMPLE_JSON = JSON.stringify(
  {
    id: "order-1024",
    createdAt: "2026-06-17T10:30:00Z",
    customer: '{"name":"Ada Lovelace","tier":"gold","id":"cust-77"}',
    items: [
      '{"sku":"A-1","qty":2,"price":19.99}',
      '{"sku":"B-7","qty":1,"price":149}',
    ],
    metadata: '{"source":"web","flags":"[\\"priority\\",\\"gift\\"]"}',
    note: "Leave at front desk",
  },
  null,
  2,
);
