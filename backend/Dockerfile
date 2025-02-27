FROM rust:latest

WORKDIR /app

COPY . .

EXPOSE 8000

RUN rustup update stable   # Ensure the Rust toolchain is installed

CMD ["cargo", "run"]
