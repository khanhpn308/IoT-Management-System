from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import mysql.connector
from passlib.context import CryptContext
from datetime import datetime
from pydantic import BaseModel, Field
app = FastAPI()

# Định nghĩa cấu trúc gửi lên
class RegisterRequest(BaseModel):
    name: str
    # Bắt buộc chuỗi bắt đầu bằng NV và có 5 số
    username: str = Field(..., pattern=r"^NV\d{5}$") 
    password: str

class LoginRequest(BaseModel):
    username: str = Field(..., pattern=r"^NV\d{5}$")
    password: str
# 1. Cấu hình CORS để Frontend (HTML/JS) có thể gọi được API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 2. Cấu hình công cụ băm (hash) mật khẩu
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password):
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

# 3. Hàm kết nối MySQL (Nhớ thay đổi mật khẩu cho đúng với máy bạn)
def get_db_connection():
    return mysql.connector.connect(
        host="localhost",
        user="root",        # Thay bằng user của bạn
        password="khanh14790123",        # Thay bằng mật khẩu MySQL của bạn
        database="mydb"     # Tên database trên máy bạn
    )





# ==========================================
# API 1: ĐĂNG KÝ TÀI KHOẢN
# ==========================================
@app.post("/api/auth/register")
def register(request: RegisterRequest):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    
    try:
        # Kiểm tra xem email đã tồn tại chưa
        cursor.execute("SELECT * FROM user WHERE username = %s", (request.username,))
        if cursor.fetchone():
            raise HTTPException(status_code=400, detail="Username này đã được sử dụng!")

        # Mã hóa mật khẩu
        hashed_pw = get_password_hash(request.password)
        
        # Lấy ngày hiện tại
        today = datetime.now().strftime('%Y-%m-%d')

        # Lưu vào database (mặc định role là 'User' và status là 'active')
        sql = """INSERT INTO user (full_name, username, password, role, status, created_at) 
                 VALUES (%s, %s, %s, %s, %s, %s)"""
        values = (request.name, request.username, hashed_pw, 'User', 'active', today)
        
        cursor.execute(sql, values)
        conn.commit()
        
        return {"message": "Đăng ký tài khoản thành công!"}
        
    finally:
        cursor.close()
        conn.close()

# ==========================================
# API 2: ĐĂNG NHẬP
# ==========================================
@app.post("/api/auth/login")
def login(request: LoginRequest):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    
    try:
        # Tìm user theo email
        cursor.execute("SELECT * FROM user WHERE username = %s", (request.username,))
        user = cursor.fetchone()

        # Kiểm tra user có tồn tại và mật khẩu giải mã ra có khớp không
        if not user or not verify_password(request.password, user['password']):
            raise HTTPException(status_code=401, detail="Sai email hoặc mật khẩu!")

        # Kiểm tra trạng thái tài khoản
        if user['status'] != 'active':
            raise HTTPException(status_code=403, detail="Tài khoản của bạn đã bị vô hiệu hóa.")

        # Thành công: Trả về thông tin user (Tuyệt đối không trả về cột password)
        return {
            "message": "Đăng nhập thành công!",
            "user": {
                "id": user["id"],
                "name": user["full_name"],
                "username": user["username"],
                "role": user["role"]
            },
            "token": "fake-jwt-token-cho-den-khi-hoc-bai-tiep-theo" 
        }
        
    finally:
        cursor.close()
        conn.close()

# ==========================================
# API 3: LẤY DANH SÁCH USER
# ==========================================
# ==========================================
# API 3: LẤY DANH SÁCH USER
# ==========================================
@app.get("/api/users")
def get_users():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    try:
        # LƯU Ý: Đã đổi 'created_at' thành 'date_active' để khớp 100% với Database của bạn
        cursor.execute("SELECT id, full_name as name, username, role, status, created_at as registered FROM user")
        users = cursor.fetchall()
        
        # Format lại ngày tháng cho đẹp (nếu không có đoạn này web dễ bị lỗi định dạng ngày)
        for u in users:
            if u['registered']:
                u['registered'] = u['registered'].strftime('%Y-%m-%d')
                
        return users
    finally:
        cursor.close()
        conn.close()
# ==========================================
# API 4: XÓA TÀI KHOẢN (Chỉ Admin)
# ==========================================
@app.delete("/api/users/{user_id}")
def delete_user(user_id: int):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    
    try:
        # Tùy chọn: Bạn có thể thêm code kiểm tra xem user_id có tồn tại không
        cursor.execute("DELETE FROM user WHERE id = %s", (user_id,))
        conn.commit()
        
        # Kiểm tra xem có dòng nào thực sự bị xóa không (nếu id không tồn tại thì rowcount = 0)
        if cursor.rowcount == 0:
            raise HTTPException(status_code=404, detail="Không tìm thấy tài khoản này!")
            
        return {"message": "Xóa tài khoản thành công!"}
    except mysql.connector.Error as err:
        # Bắt lỗi nếu tài khoản này đang dính khóa ngoại (ví dụ: đang quản lý device)
        raise HTTPException(status_code=400, detail=f"Không thể xóa: {err}")
    finally:
        cursor.close()
        conn.close()

# Cấu trúc nhận dữ liệu từ Modal Add User
class AddUserRequest(BaseModel):
    name: str
    username: str = Field(..., pattern=r"^NV\d{5}$")
    role: str
    password: str

# ==========================================
# API 5: THÊM USER (Chỉ Admin dùng)
# ==========================================
@app.post("/api/users")
def add_user(request: AddUserRequest):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    try:
        # Kiểm tra username đã tồn tại chưa
        cursor.execute("SELECT * FROM user WHERE username = %s", (request.username,))
        if cursor.fetchone():
            raise HTTPException(status_code=400, detail="Mã nhân viên (Username) này đã tồn tại!")

        hashed_pw = get_password_hash(request.password)
        today = datetime.now().strftime('%Y-%m-%d')
        
        # Thêm vào DB: Mặc định status là 'active' và created_at là hôm nay
        sql = """INSERT INTO user (full_name, username, password, role, status, created_at) 
                 VALUES (%s, %s, %s, %s, %s, %s)"""
        cursor.execute(sql, (request.name, request.username, hashed_pw, request.role, 'active', today))
        conn.commit()
        
        return {"message": "Thêm user thành công!"}
    finally:
        cursor.close()
        conn.close()