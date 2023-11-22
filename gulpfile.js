// gulpプラグインを読み込みます
const { src, dest, watch } = require("gulp");
// Sassをコンパイルするプラグインを読み込みます
const sass = require("gulp-sass")(require("sass"));

const browserSync = require("browser-sync");


/**
 * Sassをコンパイルするタスクです
 */
const compileSass = () =>
  // style.scssファイルを取得
  src("css/style.scss")
    // Sassのコンパイルを実行
    .pipe(
      // コンパイル後のCSSを展開
      sass({
        outputStyle: "expanded"
      })
    )
    // cssフォルダー以下に保存
    .pipe(dest("css"));

    gulp.task("browserSyncTask", function () {
      browserSync({
        server: {
          baseDir: "src", // ルートとなるディレクトリを指定
        },
      });
    
      // srcフォルダ以下のファイルを監視
      gulp.watch("src/**", function () {
        browserSync.reload(); // ファイルに変更があれば同期しているブラウザをリロード
      });
    })

/**
 * Sassファイルを監視し、変更があったらSassを変換します
 */
const watchSassFiles = () => watch("css/style.scss", compileSass);

// const taskServer = (done) => {
//   browserSync.init({
//    server: {
//     baseDir:  "./",
//    },
//    startPath: "src/index.html",      // 開きたいパスを指定する
//    notify: false,                    // ブラウザ更新時に出てくる通知を非表示にする
//    open: "external",       
//    port: 2000
//   })
//   done();
// };

// const taskReload = (done) => {
//   browserSync.reload();
//   done();
// };

// const taskWatch = (done) => {
//   watch("./src/**", taskReload); 
//   done();
// }


// npx gulpというコマンドを実行した時、watchSassFilesが実行されるようにします
exports.default = watchSassFiles;
// exports.default = parallel(taskServer, taskWatch);

