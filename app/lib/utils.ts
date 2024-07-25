import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function formatPrice(
  price: number | string,
  options: {
    currency?: "USD" | "EUR" | "GBP" | "BDT";
    notation?: Intl.NumberFormatOptions["notation"];
  } = {},
) {
  const { currency = "USD", notation = "compact" } = options;

  const numericPrice =
    typeof price === "string" ? Number.parseFloat(price) : price;
  const newPrice = new Intl.NumberFormat("en-US", {
    currency,
    notation,
    style: "currency",
    maximumFractionDigits: 2,
  }).format(numericPrice);
  return newPrice;
}

const letters = "!ABCDEFGHIJKLMNOPQRSTUVWXYZ#";

export const handleMouseEnter = (event: MouseEvent) => {
  if (!event) return;
  const element = event.target as HTMLDivElement;
  let iteration: number = 0;
  const speed: number = element.dataset.value!.length > 7 ? 30 : 60;

  let lastTimestamp: number;
  let animationFrameId: number | null;

  const animate = (timestamp: number) => {
    if (!lastTimestamp) {
      lastTimestamp = timestamp;
    }

    // deltaTime is the time elapsed since the last animation frame
    // I use am to reduce or increase speed
    const deltaTime = timestamp - lastTimestamp;

    if (deltaTime >= speed) {
      // @ts-expect-error Hacking the type
      element!.textContent! = [...element!.textContent!]
        .map((_: string, index: number) => {
          if (index < iteration) {
            return element.dataset.value![index];
          }

          return letters[Math.floor(Math.random() * letters.length)];
        })
        .join("");

      if (iteration >= element.dataset.value!.length) {
        // Stop the animation if completed
        return;
      }

      iteration += 1 / 3;
      lastTimestamp = timestamp;
    }

    animationFrameId = requestAnimationFrame(animate);
  };

  cancelAnimationFrame(animationFrameId!);
  animationFrameId = requestAnimationFrame(animate);
};
