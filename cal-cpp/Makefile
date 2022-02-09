NAME=cal-cpp
CC=g++
FLAGS=-Wall -Werror -Wextra
DEBUG_FLAGS=-g -fsanitize=address
SRC=src/*.cpp
RM =rm -rf

$(NAME): $(SRC)
	$(CC) $(FLAGS) $(LIBS) $(SRC) -o $(NAME)

run: 
	./$(NAME)
