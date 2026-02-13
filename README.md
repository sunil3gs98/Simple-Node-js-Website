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
# Verify Nginx is running:
sudo systemctl status nginx
```
### 3️⃣ Configure Nginx as a Reverse Proxy
Create the configuration file:
```bash
sudo nano /etc/nginx/sites-available/nodeapp
```
Add the following configuration to the file to forward port 80 to 3000:
```nginx
server {
    listen 80;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable the configuration and reload the service:
```bash
sudo ln -s /etc/nginx/sites-available/nodeapp /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
``` 

---

## 🌐 How to Access the Website

* **Via Reverse Proxy**: `http://localhost`.
* **Direct Backend Access (Node.js)**: `http://localhost:3000`.

---

## 🔁 How to Verify Reverse Proxy Is Working

* **✅ Test 1: Stop Nginx**
    * `sudo systemctl stop nginx`.
    * Test access via `curl http://localhost`.
    * **Expected result**: Connection refused (Confirms Nginx was serving traffic on port 80).
* **✅ Test 2: Backend Still Running**
    * `curl http://localhost:3000`.
    * **Expected result**: Backend responds (Proving Node.js is independent of Nginx).
* **✅ Test 3: Check Nginx Response Headers**
    * Restart Nginx: `sudo systemctl start nginx`.
    * Run: `curl -I http://localhost`.
    * **Expected result**: Header includes `Server: nginx`.
* **✅ Test 4: Check Nginx Access Logs**
    * `sudo tail -f /var/log/nginx/access.log`.
    * **Expected result**: Incoming requests appear in logs.

---
