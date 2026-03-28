import { test, expect } from '@playwright/test';
import { login } from './helpers/auth';
import { requireUserSeed } from './helpers/seed';
import { NEXT_PUBLIC_APP_URL, TEST_USER_EMAIL, TEST_USER_PASSWORD } from './helpers/env';

const URL = NEXT_PUBLIC_APP_URL;

// Test Suite: Core Editor Workflows
// Implements robust deterministic test-ids across root wrappers, canvases, and toolbars
test.describe('Core Editor Workflows', () => {
  // Safely skip bounds if the CI agent lacks database-connected credentials
  test.beforeEach(() => {
    requireUserSeed();
  });

  test('successfully creates a project, confirms canvas mount, saves, and processes exports natively', async ({ page }) => {
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
    const editorCanvas = editorWorkspace.locator('canvas').first();
    await expect(editorCanvas).toBeVisible();

    // 6. Test Database saving pipelines natively via stable Save Button
    const saveBtn = page.getByTestId('save-btn');
    await expect(saveBtn).toBeVisible();
    await saveBtn.click();
    
    // Listen for toaster confirming database roundtrip
    // Uses structural substring matching bounded into the standard toast alert layer
    await expect(page.locator('li[data-sonner-toast]').filter({ hasText: /Saved successfully/i }).first()).toBeVisible({ timeout: 10000 });

    // 7. Test Export Workflows (PNG generation)
    // Click explicit Header Dropdown trigger mapped dynamically to a structural test DOM
    const exportTrigger = page.getByTestId('export-menu-btn');
    await exportTrigger.click();

    // Monitor background thread triggering native buffer saving 
    const downloadPromisePng = page.waitForEvent('download');
    await page.getByTestId('export-png-btn').click();
    
    // Verify client downloaded explicitly without freezing or 500ing
    const downloadPng = await downloadPromisePng;
    expect(downloadPng.suggestedFilename()).toContain('.png');

    // 8. Test Export Workflows (PDF-lib integration)
    // Re-open explicit menu dynamically closing 
    await exportTrigger.click();
    
    // Execute PDF bounding
    const downloadPromisePdf = page.waitForEvent('download');
    await page.getByTestId('export-pdf-btn').click();
    
    // Verify asynchronous buffer returned safely into downloads path
    const downloadPdf = await downloadPromisePdf;
    expect(downloadPdf.suggestedFilename()).toContain('.pdf');
  });

  test('successfully loads a rich populated fixture, renders reliably, and exports bounds', async ({ page }) => {
    // 1. Authenticate locally through isolated helper
    await login(page, TEST_USER_EMAIL, TEST_USER_PASSWORD, URL);

    // 2. Bound dynamically onto the unified user dashboard
    await page.goto(`${URL}/app/projects`);
    await expect(page).toHaveURL(/.*\/app\/projects/);

    // 3. Initiate Project Creation safely navigating creation states
    const createProjectBtn = page.getByTestId('new-project-btn').or(page.getByTestId('new-project-empty-btn')).first();
    
    // 4. MOCK FIXTURE INTERCEPT - Override Database response on Editor Load natively 
    const demoFixture = require('./fixtures/demo-project.json');
    await page.route('**/rest/v1/projects?*', async route => {
      // Catch Supabase JS fetching operations bound to single project initialization
      if (route.request().method() === 'GET' && route.request().url().includes('select=diagram_data')) {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ diagram_data: demoFixture }) // .single() strictly returns the naked DB object
        });
      } else {
        await route.continue();
      }
    });

    await expect(createProjectBtn).toBeVisible();
    await createProjectBtn.click();
    
    // 5. Await downstream redirect safely dropping into workspace layout boundaries
    await page.waitForURL(/.*\/app\/projects\/.+/, { timeout: 20000 });
    
    // 6. Verify absolute Canvas pipeline rendering via the stable workspace DOM container
    // Konva runs its rendering loop evaluating all 4 complex nodes inserted locally
    const editorWorkspace = page.getByTestId('editor-workspace-container').first();
    await expect(editorWorkspace).toBeVisible();
    const editorCanvas = editorWorkspace.locator('canvas').first();
    await expect(editorCanvas).toBeVisible();

    // 7. Verify Data Integrity via Save button (proving UI stability wasn't broken by raw state drops)
    const saveBtn = page.getByTestId('save-btn');
    await expect(saveBtn).toBeVisible();
    await saveBtn.click();
    await expect(page.locator('li[data-sonner-toast]').filter({ hasText: /Saved successfully/i }).first()).toBeVisible({ timeout: 10000 });

    // 8. Prove Export triggers over rich canvases don't crash the headless browser buffer processing
    const exportTrigger = page.getByTestId('export-menu-btn');
    await exportTrigger.click();

    const downloadPromisePng = page.waitForEvent('download');
    await page.getByTestId('export-png-btn').click();
    
    const downloadPng = await downloadPromisePng;
    expect(downloadPng.suggestedFilename()).toContain('.png');

    // PDF 
    await exportTrigger.click();
    const downloadPromisePdf = page.waitForEvent('download');
    await page.getByTestId('export-pdf-btn').click();
    const downloadPdf = await downloadPromisePdf;
    expect(downloadPdf.suggestedFilename()).toContain('.pdf');
  });
});
