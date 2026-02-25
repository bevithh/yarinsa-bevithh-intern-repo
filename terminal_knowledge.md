# Which terminal client did you choose? Why?

I chose iTerm2 combined with the zsh shell. I picked iTerm2 over the default Mac Terminal because it offers much better window management—like split panes—which allows me to run my backend server in one window and execute Git commands in another without switching tabs. It also handles large amounts of code output more smoothly, which is essential for debugging backend logs.

# What customizations (if any) did you make?

I installed Oh My Zsh to manage my plugins and themes. I initially tried the agnoster theme, but I switched to a more standard one like robbyrussell to keep the visuals clean and avoid font issues. I also added several aliases to my .zshrc file for Git, such as gst for git status and gp for git push, to save time during my daily workflow.

# What was the most useful command you learned today?

The most useful command I learned was ssh -T git@github.com. It was the only way to truly verify that my SSH key was correctly authenticated after I struggled with permission errors between my student and personal GitHub accounts. Another close second was git remote set-url, which allowed me to fix my repository's address so I could finally push my code.
