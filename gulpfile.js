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


// npx gulpというコマンドを実行した時、watchSassFilesが実行されるようにします
exports.default = watchSassFiles;















