#[macro_use] extern crate rocket;
use rocket::{serde::json::Json};
use serde::{Deserialize, Serialize};
use std::process::{Command};
use rocket_cors::{AllowedOrigins, Cors, CorsOptions};

#[derive(Deserialize)]
struct CodeInput {
    code: String,
}

#[derive(Serialize)]
struct CodeOutput {
    output: String,
}

fn compile_and_run(code: &str) -> String {
    let temp_file_path = "/tmp/rust_code.rs";
    let output_executable = "/tmp/rust_code";

    if std::fs::write(temp_file_path, code).is_err() {
        return "Failed to write code to file".into();
    }

    let compile_result = Command::new("rustc")
        .arg(temp_file_path)
        .arg("-o")
        .arg(output_executable)
        .output();

    if compile_result.is_err() {
        return "Failed to compile code".into();
    }

    let output = Command::new(output_executable)
        .output();

    let _ = std::fs::remove_file(temp_file_path);
    let _ = std::fs::remove_file(output_executable);

    match output {
        Ok(result) => String::from_utf8_lossy(&result.stdout).to_string(),
        Err(_) => "Failed to execute compiled code".into(),
    }
}

#[post("/api/compile", format = "json", data = "<code_input>")]
async fn compile_code(code_input: Json<CodeInput>) -> Json<CodeOutput> {
    let output = compile_and_run(&code_input.code);
    Json(CodeOutput { output })
}

fn cors() -> Cors {
    CorsOptions::default()
        .allowed_origins(AllowedOrigins::all())
        .allow_credentials(true)
        .to_cors()
        .expect("Failed to create CORS configuration")
}

#[launch]
fn rocket() -> _ {
    rocket::build()
        .attach(cors())
        .mount("/", routes![compile_code])
}
