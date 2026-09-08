# Claude model and host compatibility

Checked 2026-09-08 against https://code.claude.com/docs/en/model-config,
https://code.claude.com/docs/en/sub-agents and https://code.claude.com/docs/en/hooks.

Preserve the operator's current model and effort. Generated subagents default
to `model: inherit` unless the approved plan selects an available alternative.
Fable 5.1 is available to eligible accounts through `fable` on Claude Code
2.1.255 or newer; the installer never opts into usage credits. Model aliases
can resolve differently by provider. Do not assume a three-model enum, a fixed
thinking budget, or an obsolete Opus version is the universal current default.

Claude delegates through `Agent` (legacy `Task`) and may use native `PowerShell`
instead of Bash. Use only the real session tool schema. Keep consent in the
main conversation when a worker cannot ask the user. Setup alone does not
activate guards; install current Eidolon and verify `/hooks` for enforcement.

This note overrides version-specific assumptions in the preserved historical
session workflow without changing its original record. Live model behavior,
account entitlements and provider-specific integrations remain acceptance checks.
