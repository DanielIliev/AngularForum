declare var process: Process;

interface Process {
    env: Env
}

interface Env {
    MONGO_URI: string
}

interface GlobalEnvironment {
    process: Process
}