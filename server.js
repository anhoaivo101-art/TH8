const express = require("express");
const multer = require("multer");
const path = require("path");
const app = express();

// Cấu hình lưu trữ (Mục III) [cite: 93]
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads"); // Thư mục lưu file [cite: 95]
    },
    filename: (req, file, cb) => {
        // Đặt tên: Thời gian hiện tại + tên gốc [cite: 96]
        cb(null, Date.now() + "-" + file.originalname);
    }
});

// Cấu hình upload nhiều file - tối đa 17 file (Mục IV) [cite: 129, 134]
const uploadMany = multer({ storage: storage }).array("many-files", 17);

// Route hiển thị giao diện chính
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views/master.html"));
});

// Route xử lý upload (Mục IV)
app.post("/upload", (req, res) => {
    uploadMany(req, res, (err) => {
        if (err) {
            return res.send("Lỗi upload: " + err);
        }
        res.send("Upload nhiều file thành công!"); // [cite: 133]
    });
});

// Chạy server tại cổng 8017 [cite: 113, 114]
app.listen(8017, () => {
    console.log("Server đang chạy tại http://localhost:8017");
});