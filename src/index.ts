import server from "@/node-server";

// サーバー起動処理
server({
  PORT: 3000,
})
  .then()
  .catch((e) => {
    console.error(e);
    console.error(e.stack);
  });
