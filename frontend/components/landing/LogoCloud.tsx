const aiProviders = [
  { name: "ChatGPT", label: "ChatGPT" },
  { name: "Gemini", label: "Gemini" },
  { name: "DeepSeek", label: "DeepSeek" },
  { name: "Claude", label: "Claude" },
  { name: "Llama", label: "Llama" },
  { name: "Mistral", label: "Mistral" },
];

export function LogoCloud() {
  return (
    <div className="w-full px-4 py-12 sm:px-6 sm:py-16">
      <p className="mb-8 text-center text-xs font-medium uppercase tracking-[0.2em] text-[#9ca3af]">
        Similar to
      </p>
      <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 sm:gap-x-14">
        {aiProviders.map((provider) => (
          <span
            key={provider.name}
            className="select-none text-lg font-bold tracking-tight text-[#9ca3af] sm:text-xl"
            aria-label={provider.name}
          >
            {provider.label}
          </span>
        ))}
      </div>
    </div>
  );
}
