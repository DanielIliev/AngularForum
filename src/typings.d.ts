declare var process: Process;

interface Process {
    env: Env
}

interface Env {
    data: string
}

interface GlobalEnvironment {
    process: Process
}