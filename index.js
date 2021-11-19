import { Player } from "./src/Player.js";

(async () => {
  const test = new Player();
  let te = await test.search(
    "https://www.youtube.com/watch?v=w0BJ6Xqbj3I&list=PL11aMYMqFaJUXKzSSnZeUlyWTWOb-iDlU"
  );
  console.log(te);
})();
