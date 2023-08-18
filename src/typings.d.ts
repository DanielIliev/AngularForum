declare var process: Process;

interface Process {
    env: Env
}

interface Env {
    MONGODB_URI: string
}

interface GlobalEnvironment {
    process: Process
}