use actix_files::{Files, NamedFile};
use actix_web::{get, post, web, App, HttpResponse, HttpServer, Responder, Result};
use std::path::PathBuf;

#[get("/")]
async fn hello() -> impl Responder {
    HttpResponse::Ok().body("Hello world!")
}

#[post("/echo")]
async fn echo(req_body: String) -> impl Responder {
    HttpResponse::Ok().body(req_body)
}

async fn manual_hello() -> impl Responder {
    HttpResponse::Ok().body("Hey there!")
}

async fn index() -> impl Responder {
    "App root page!!!"
}

async fn me() -> impl Responder {
    "App me page!!!"
}

// async fn file(req: HttpRequest) -> Result<NamedFile> {
//     let path: PathBuf = req.match_info().query("filename").parse().unwrap();
//     Ok(NamedFile::open(path)?)
// }

async fn open_react() -> Result<NamedFile> {
    let path: PathBuf = PathBuf::from("./build/index.html");
    Ok(NamedFile::open(path)?)
}

#[get("/users/{user_id}/{friend}")] // <- define path parameters
async fn users(path: web::Path<(u32, String)>) -> Result<String> {
    let (user_id, friend) = path.into_inner();
    Ok(format!("Welcome {}, user_id {}!", friend, user_id))
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .service(hello)
            .service(echo)
            .service(users)
            // .route("/{filename:.*}", web::get().to(file))
            .route("/react", web::get().to(open_react))
            .route("/hey", web::get().to(manual_hello))
            .service(Files::new("/build/", "./build/")) // Serve the static files route for the react app
            .service(
                // prefixes all resources and routes attached to it...
                web::scope("/app")
                    // ...so this handles requests for `GET /app/index.html`
                    .route("", web::get().to(index))
                    .route("/", web::get().to(index))
                    .route("/me", web::get().to(me)),
            )
    })
    .bind(("127.0.0.1", 8082))?
    .run()
    .await
}
