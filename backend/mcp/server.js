process.env.DOTENV_CONFIG_QUIET = "true";

require("dotenv").config({
    path: require("path").join(
        __dirname,
        "../.env"
    ),
    quiet: true
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

    name:"ecommerce",

    version:"1.0.0"
});

server.tool(

    "get_orders",

    "Get all orders",

    {},

    async () => {

        return new Promise(

            (resolve,reject)=>{

                db.query(

                    `
                    SELECT
                    id,
                    total_amount,
                    status
                    FROM orders
                    ORDER BY id DESC
                    `,

                    (err,result)=>{

                        if(err){

                            reject(err);
                            return;
                        }

                        resolve({

                            content:[
                                {
                                    type:"text",
                                    text:JSON.stringify(
                                        result,
                                        null,
                                        2
                                    )
                                }
                            ]
                        });
                    }
                );
            }
        );
    }
);
server.tool(
  "get_products",
  "Get all products",
  {},
  async () => {
    return new Promise((resolve, reject) => {

      db.query(
        `SELECT id,name,price,stock,category
         FROM products`,
        (err, result) => {

          if (err) {
            reject(err);
            return;
          }

          resolve({
            content: [{
              type: "text",
              text: JSON.stringify(result, null, 2)
            }]
          });
        }
      );

    });
  }
);
server.tool(
  "get_users",
  "Get all users",
  {},
  async () => {

    return new Promise((resolve,reject)=>{

      db.query(
        `SELECT id,name,email
         FROM users`,
        (err,result)=>{

          if(err){
            reject(err);
            return;
          }

          resolve({
            content:[{
              type:"text",
              text:JSON.stringify(
                result,
                null,
                2
              )
            }]
          });

        }
      );

    });

  }
);
server.tool(
  "get_reviews",
  "Get all reviews",
  {},
  async () => {

    return new Promise((resolve,reject)=>{

      db.query(
        `SELECT *
         FROM reviews`,
        (err,result)=>{

          if(err){
            reject(err);
            return;
          }

          resolve({
            content:[{
              type:"text",
              text:JSON.stringify(
                result,
                null,
                2
              )
            }]
          });

        }
      );

    });

  }
);

async function main(){

    const transport =
    new StdioServerTransport();

    await server.connect(
        transport
    );
}

main().catch(console.error);