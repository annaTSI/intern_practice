const path = require("path");

require("dotenv").config({
    path: path.join(
        __dirname,
        "../.env"
    )
});

const db =
require("../config/db");

const { McpServer } =
require("@modelcontextprotocol/sdk/server/mcp.js");

const {
    StdioServerTransport
} =
require("@modelcontextprotocol/sdk/server/stdio.js");

const server =
new McpServer({

    name: "ecommerce",

    version: "1.0.0"
});

server.tool(

    "get_orders",

    "Get all orders from database",

    async () => {

        const [rows] =

        await db.promise().query(

            `SELECT
                id,
                total_amount,
                payment_status,
                status
             FROM orders
             ORDER BY id DESC`
        );

        return {

            content: [

                {
                    type: "text",

                    text:
                    JSON.stringify(
                        rows,
                        null,
                        2
                    )
                }
            ]
        };
    }
);

async function main() {

    const transport =
    new StdioServerTransport();

    await server.connect(
        transport
    );
}

main().catch(

    (error) => {

        console.error(error);
    }
);