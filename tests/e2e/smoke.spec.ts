import { test, expect } from "@playwright/test";

test("Hauptseiten laden", async ({ page }) => {
  for (const route of ["/", "/guides", "/items", "/tier-list", "/ranking"]) {
    await page.goto(route);
    await expect(page).toHaveTitle(/RiftKompass|Guide|Tier List|Rangliste/);
  }
});
