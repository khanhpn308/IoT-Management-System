# 1. Dùng môi trường Python chính thức siêu nhẹ
FROM python:3.10-slim
# 2. Đặt thư mục làm việc mặc định ở bên trong Container
WORKDIR /app
# 3. Copy file requirements vào trước và cài đặt thư viện
# MẸO DOCKER: Việc này giúp Docker "nhớ" (cache) các thư viện. 
# Nếu bạn chỉ sửa code mà không sửa thư viện, lần build sau sẽ diễn ra trong chớp mắt!
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 4. Mở cổng 8000 để giao tiếp với bên ngoài
EXPOSE 8000

# 5. Khởi chạy server. Cờ --reload cực kỳ quan trọng để server tự update khi bạn bấm Save code
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]