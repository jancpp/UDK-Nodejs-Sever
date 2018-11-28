


class Log():

    @classmethod
    def error_to_file(cls, message=''):
        with open('error.txt', 'a') as f:
            f.write(message)