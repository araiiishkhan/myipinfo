import { execSync } from 'child_process';
import fs from 'fs';

// Check if git bundle exists already and remove it
const bundleName = 'project-repository.bundle';
if (fs.existsSync(bundleName)) {
  console.log(`Removing previous ${bundleName}...`);
  fs.unlinkSync(bundleName);
}

try {
  // Create a git bundle (contains all Git history in a single file)
  console.log('Creating Git bundle...');
  execSync('git bundle create project-repository.bundle --all');
  
  console.log(`
Git bundle created successfully as '${bundleName}'!

This bundle contains your entire Git repository, including all history.

To use this bundle on another computer:
1. Create a new empty folder
2. Run: git clone project-repository.bundle my-project
3. Navigate to my-project folder
4. Set your GitHub remote: git remote set-url origin https://github.com/yourusername/your-repo.git
5. Push to GitHub: git push -u origin main

This preserves all your commit history.
`);
} catch (error) {
  console.error('Error creating Git bundle:', error.message);
  console.log('Make sure Git is installed and you\'re in a valid Git repository.');
}