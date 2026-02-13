# Nginx Reverse Proxy with Node.js Website

This project demonstrates how to host a **full-stack website** (HTML + CSS frontend with a Node.js backend) behind **Nginx configured as a reverse proxy**.

Nginx acts as the public-facing web server on port **80**, while the Node.js application runs privately on port **3000**.

---

## 📌 Architecture Overview


- **Frontend**: HTML, CSS
- **Backend**: Node.js (Express)
- **Reverse Proxy**: Nginx

---

## 📁 Project Structure


---

## 🔧 Prerequisites

- Linux (Ubuntu recommended)
- Node.js (v16+)
- Nginx
- sudo privileges

---

## 🚀 How to Run the Project

### 1️⃣ Start the Node.js Backend

```bash
cd backend
npm install
npm start
----------------
 2️⃣ Install and Start Nginx

sudo apt update
sudo apt install nginx -y
sudo systemctl start nginx

Verify Nginx is running:
  sudo systemctl status nginx

--------------

3️⃣ Configure Nginx as a Reverse Proxy

sudo nano /etc/nginx/sites-available/nodeapp

Add the Nginix file coniguartion to nodeapp

Enable the configuration
  sudo ln -s /etc/nginx/sites-available/nodeapp /etc/nginx/sites-enabled/
  sudo nginx -t
  sudo systemctl reload nginx
---------------------
🌐 How to Access the Website

Via Reverse Proxy
  http://localhost
Direct Backend Access (Node.js)
  http://localhost:3000
------------------------------
🔁 How to Verify Reverse Proxy Is Working

✅ Test 1: Stop Nginx
  sudo systemctl stop nginx
Test access:
curl http://localhost
Expected result:
Connection refused
✔ Confirms Nginx was serving traffic on port 80.

✅ Test 2: Backend Still Running
curl http://localhost:3000
✔ Backend should still respond, proving Node.js is independent of Nginx.

✅ Test 3: Check Nginx Response Headers
Start Nginx again:
sudo systemctl start nginx
Run:
curl -I http://localhost
Expected output includes:
Server: nginx
✔ Confirms requests are passing through Nginx.

✅ Test 4: Check Nginx Access Logs
sudo tail -f /var/log/nginx/access.log
✔ Requests appearing in the logs confirm reverse proxy usage.

