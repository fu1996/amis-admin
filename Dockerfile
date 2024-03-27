# 使用node 16版本作为基础镜像
FROM node:16

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json 到工作目录
COPY package*.json ./
# 复制
COPY ./public ./public
COPY ./server.js ./server.js
COPY ./pages ./pages
COPY ./index.html ./index.html

VOLUME [ "/app/pages" ]

# 安装依赖
RUN npm install

# 暴露端口
EXPOSE 3000

# 运行应用
CMD [ "node", "server.js" ]