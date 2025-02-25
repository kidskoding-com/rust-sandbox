FROM rust:1.74

WORKDIR /app

COPY . .

RUN cargo build --release

EXPOSE 5000
CMD ["./target/release/rust-sandbox"]
