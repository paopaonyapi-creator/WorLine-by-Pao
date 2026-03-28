import { test, expect } from '@playwright/test';
import { login } from './helpers/auth';
import { requireUserSeed } from './helpers/seed';
import { NEXT_PUBLIC_APP_URL, TEST_USER_EMAIL, TEST_USER_PASSWORD } from './helpers/env';

const URL = NEXT_PUBLIC_APP_URL;

// Test Suite: Mobile Editor Workflows
test.describe('Mobile Editor Workflows', () => {
  // Use typical mobile boundaries
  test.use({ viewport: { width: 375, height: 667 } });
  
  test.beforeEach(() => {
    requireUserSeed();
  });

  test('successfully tests core editor behaviors rendered behind mobile responsive interactions', async ({ page }) => {
    // 1. Authenticate locally through isolated helper
    await login(page, TEST_USER_EMAIL, TEST_USER_PASSWORD, URL);

    // 2. Bound dynamically onto the unified user dashboard
    await page.goto(`${URL}/app/projects`);
    await expect(page).toHaveURL(/.*\/app\/projects/);

    // 3. Initiate Project Creation safely navigating creation states
    // Uses the new stable test ID instead of raw text masking 
    const createProjectBtn = page.getByTestId('new-project-btn').or(page.getByTestId('new-project-empty-btn')).first();
    await expect(createProjectBtn).toBeVisible();
    await createProjectBtn.click();

    // 4. Await downstream redirect safely dropping into workspace layout boundaries
    await page.waitForURL(/.*\/app\/projects\/.+/, { timeout: 20000 });
    
    // 5. Verify absolute Canvas pipeline rendering via the stable workspace DOM container
    // Enforces the overarching workspace wrapper finishes loading and injects boundaries
    const editorWorkspace = page.getByTestId('editor-workspace-container').first();
    await expect(editorWorkspace).toBeVisible();
    const editorCanvasContainer = editorWorkspace.getByTestId('canvas-container').first();
    await expect(editorCanvasContainer).toBeVisible();

    // 6. Test Mobile Specific Collapsed Triggers
    // Check that standard "Palette" hides and we need to click the specialized mobile ToolPlus drawer
    const mobileToolsMenu = page.getByTestId('mobile-tools-menu-btn');
    await expect(mobileToolsMenu).toBeVisible();
    await mobileToolsMenu.click();
    
    // Opening it should slide up / popout the symbol library
    const mobileSymbolLibrary = page.getByTestId('mobile-symbol-library-btn');
    await expect(mobileSymbolLibrary).toBeVisible();
    await page.keyboard.press('Escape'); // Hide dropdown to avoid blocking subsequent layouts
    
    // 7. Test Database saving pipelines natively via stable Save Button 
    // Usually preserved in the top bar universally but worth catching strictly natively
    const saveBtn = page.getByTestId('save-btn');
    await expect(saveBtn).toBeVisible();
    await saveBtn.click();
    
    // Listen for toaster confirming database roundtrip
    await expect(page.locator('li[data-sonner-toast]').filter({ hasText: /Saved successfully/i }).first()).toBeVisible({ timeout: 10000 });

    // 8. Test Export Workflows (PNG generation) using the default export or overflowing behaviors
    const exportTrigger = page.getByTestId('export-menu-btn');
    await expect(exportTrigger).toBeVisible();
    await exportTrigger.click();

    // Monitor background thread triggering native buffer saving 
    const downloadPromisePng = page.waitForEvent('download');
    await page.getByTestId('export-png-btn').click();
    
    // Verify client downloaded explicitly without freezing or 500ing
    const downloadPng = await downloadPromisePng;
    expect(downloadPng.suggestedFilename()).toContain('.png');
  });
});
