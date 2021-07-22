// lottie files to consider

// just dogs
/*
https://lottiefiles.com/56997-dog-walking
https://lottiefiles.com/14751-dog-helpet
https://lottiefiles.com/16780-dog2
https://lottiefiles.com/10607-dog-avatar
https://lottiefiles.com/69263-my-dog-and-me
https://lottiefiles.com/53281-a-dog
*/

// dog walkers
/*
https://lottiefiles.com/16984-boy-and-doggy
https://lottiefiles.com/20586-illustration-walking-people-with-dog-thinking-wine
https://lottiefiles.com/66887-walking-with-dog
http://lottiefiles.com/go/premium-animation/59877
https://lottiefiles.com/69483-slipper
http://lottiefiles.com/go/premium-animation/38031
*/

/*
# Github Collaboration

## Key
* **Gitlord** - The person managing the merging of work on Git.
* **Everyone else** - All other people in the team.
* **Local** - Local Git repo on a person's machine.
* **Remote** - Remote Git repo on person's Github account.
* **Repo** - Git repository.

## Create Project (one-off)
* **Gitlord**: Generate project files and create local repo.
* **Gitlord**: Create repo on Github and push up work from local repo.
* **Everyone else**: Fork the repo on Github.
* **Everyone else**: Clone repo on Github down to local machine.
* **Everyone else**: Add git remote that points to Gitlord's Github repo on your local repo. 

## Recurring Workflow
1. Make sure you are in the feature branch which contains work you want to provide to Gitlord's Github repo.
2. Add & Commit your work `git add -A` & `git commit -m 'commit message'`.
3. To download commits to local machine:
  * **Gitlord**: Run `git fetch origin`
  * **Everyone else**: Run `git fetch gitlord`
4. To rebase commits to feature branch:
  * **Gitlord**: Run `git rebase origin/master`
  * **Everyone else**: Run `git rebase gitlord/master`
5. Run `git push origin feature_branch`, where *feature_branch* is the name of your branch.
6. Make pull request from your branch to Gitlord's master.
7. **Gitlord**: Merge pull request on Github **if** you are happy with the code contribution.
8. Gitlord to inform teammates to pull down the changes using steps 3 & 4.


PETERS EMAIL: update shifts set title = staff.firstname from staff  where shifts.staff_id = staff.staff_id;

Update users set password='$2b$10$ej5hOs3/DDab4eGkG2umEOr9KrLxksJOyGquI3Y9IvLtXSqeuBAeq';

// TO FORK SOMEONE ELSES 

1. Hit Fork on Gitlords.
2. Git Clone my personal repo from step 1
3. Go inside the direction.
4. git remote add <gitloard name> <link to .git>
*/
