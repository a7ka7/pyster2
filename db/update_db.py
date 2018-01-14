import os
import requests
from collections import OrderedDict
import psycopg2
from bs4 import BeautifulSoup
import re

PARAMS = OrderedDict(
    user='haru',
    password='kharutaka1993',
    dbname='data',
    host='localhost'
)

def parse_question(content):
    m = re.search(r'-----(.*)-----', content, flags=re.DOTALL)
    qstn, ans = map(str.strip, m.group(1).split('\n\n'))

    code = content.replace(m.group(0), '').replace('\'\'\'', '').strip()
    code = code.replace('\n\n\n', '\n\n')
    if 'fill in the blank' in qstn.lower():
        selections = qstn.split('\n')[1:]
        for selection in selections:
            if selection[0] == ans:
                rpl_str = selection.split()[-1]
                code = code.replace(rpl_str, '____')
                break

    code = code.replace('\n', '<br>').replace('    ', '&nbsp;' * 4)
    qstn = qstn.replace('\n', '<br>')

    return code, qstn, ans


def update():

    table_name = 'questions'

    conn_str = ' '.join(['='.join(x) for x in PARAMS.items()])
    try:
        conn = psycopg2.connect(conn_str)
    except Exception as e:
        print(str(e))
        print('Unable to connect the database')

    cursor = conn.cursor()
    cursor.execute('DELETE FROM {}'.format(table_name))
    cursor.execute('ALTER SEQUENCE questions_id_seq RESTART WITH 1')
    cursor.execute('SELECT * FROM questions')
    col_names = [desc[0] for desc in cursor.description]

    # scrape questions
    base_url = 'https://raw.githubusercontent.com'
    top_url = 'https://github.com/harupy/pyster/tree/master/questions'
    html = requests.get(top_url).text
    soup = BeautifulSoup(html, 'lxml')

    links = soup.select('a.js-navigation-open')
    links = [[x.text.strip(), base_url + x['href'].replace('/blob', '')]
                for x in links if '.py' in x.text and '__init__' not in x.text]

    for fname, url in links:
        content = requests.get(url).text.strip()
        item = parse_question(content)
        insert_query = 'INSERT INTO {} {} VALUES (%s,%s,%s)'
        insert_query = insert_query.format(
            table_name,
            '({})'.format(', '.join(col_names[1:]))
        )
        cursor.execute(insert_query, item)
        print(fname, 'saved')

    conn.commit()
    conn.close()
    print('update done')

def push_to_heroku(app_name):
    os.system('heroku pg:reset --app {}'.format(app_name))
    push_cmd = 'PGUSER={} PGPASSWORD={} heroku pg:push {} DATABASE_URL --app {}'
    os.system(push_cmd.format(
        *list(PARAMS.values())[:-1], app_name
    ))

def main():
    update()
    push_to_heroku('harupy-test')




if __name__ == '__main__':
    main()
