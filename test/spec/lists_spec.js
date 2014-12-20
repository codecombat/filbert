var util = require('./util.js');

describe("Lists", function () {
  it("[1, 2]", function () {
    var code = "\n\
    L = [1, 2]\n\
    return L[1]";
    expect(util.run(code)).toEqual(2);
  });

  it("[x for x in range(4)]", function () {
    var code = "\n\
    L = [x for x in range(4)]\n\
    return L";
    expect(util.run(code)).toEqual([0, 1, 2, 3]);
  });

  it("[x*2 for x in range(4) if x > 1]", function () {
    var code = "\n\
    L = [x*2 for x in range(4) if x > 1]\n\
    return L";
    expect(util.run(code)).toEqual([4, 6]);
  });

  it("[(x*2, y) for x in range(4) if x > 1 for y in range(2)]", function () {
    var code = "\n\
    L = [(x*2, y) for x in range(4) if x > 1 for y in range(2)]\n\
    return L[1]";
    expect(util.run(code)).toEqual([4, 1]);
  });

  it("[x**2 for x in range(10)]", function () {
    var code = "\n\
    L = [x**2 for x in range(10)]\n\
    return L";
    expect(util.run(code)).toEqual([0, 1, 4, 9, 16, 25, 36, 49, 64, 81]);
  });

  it("[(x, y) for x in [1,2,3] for y in [3,1,4] if x != y]", function () {
    var code = "\n\
    L = [(x, y) for x in [1,2,3] for y in [3,1,4] if x != y]\n\
    return L";
    expect(util.run(code)).toEqual([[1, 3], [1, 4], [2, 3], [2, 1], [2, 4], [3, 1], [3, 4]]);
  });

  it("[x*2 for x in vec]", function () {
    var code = "\n\
    vec = [-4, -2, 0, 2, 4]\n\
    L = [x*2 for x in vec]\n\
    return L";
    expect(util.run(code)).toEqual([-8, -4, 0, 4, 8]);
  });

  it("[abs(x) for x in vec]", function () {
    var code = "\n\
    vec = [-4, -2, 0, 2, 4]\n\
    L = [abs(x) for x in vec]\n\
    return L";
    expect(util.run(code)).toEqual([4, 2, 0 , 2, 4]);
  });

  it("[str(round(pi, i)) for i in range(1, 6)]", function () {
    var code = "\n\
    pi = 3.1415926\n\
    L = [str(round(pi, i)) for i in range(1, 6)]\n\
    return L";
    expect(util.run(code)).toEqual(['3.1', '3.14', '3.142', '3.1416', '3.14159']);
  });

  it("[[row[i] for row in matrix] for i in range(4)]", function () {
    var code = "\n\
    matrix = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12],]\n\
    transpose = [[row[i] for row in matrix] for i in range(4)]\n\
    return transpose";
    expect(util.run(code)).toEqual([[1, 5, 9], [2, 6, 10], [3, 7, 11], [4, 8, 12]]);
  });

  it("2 in [1, 2]", function () {
    var code = "\n\
    a = [1, 2]\n\
    def f(x):\n\
      return x\n\
    return f(2 in a)";
    expect(util.run(code)).toEqual(true);
  });

  it("2 in [1, 2]", function () {
    var code = "\n\
    a = [1, 2]\n\
    def f(x):\n\
      return x\n\
    return f(2 in a)";
    expect(util.run(code)).toEqual(true);
  });

  it("[1, 2] + [3]", function () {
    var code = "\n\
    return [1, 2] + [3]";
    expect(util.run(code)).toEqual([1, 2, 3]);
  });

  it("a = a + [True, 0]", function () {
    var code = "\n\
    a = [45, 23, -4, 'hi']\n\
    a = a + [True, 0]\n\
    return a";
    expect(util.run(code)).toEqual([45, 23, -4, 'hi', true, 0]);
  });

  it("a += [[1, 2], 3]", function () {
    var code = "\n\
    a = [0]\n\
    a += [[1, 2], 3]\n\
    return a";
    expect(util.run(code)).toEqual([0, [1, 2], 3]);
  });

  it("[0] * 2", function () {
    var code = "\n\
    return [0] * 2";
    expect(util.run(code)).toEqual([0, 0]);
  });

  it("[4] * 0", function () {
    var code = "\n\
    return [4] * 0";
    expect(util.run(code)).toEqual([]);
  });

  it("[7] * -3", function () {
    var code = "\n\
    return [7] * -3";
    expect(util.run(code)).toEqual([]);
  });

  it("[8] *= 4", function () {
    var code = "\n\
    a = [8]\n\
    a *= 4\n\
    return a";
    expect(util.run(code)).toEqual([8, 8, 8, 8]);
  });

  it("['hi'] *= 2", function () {
    var code = "\n\
    a = ['hi']\n\
    a *= 2\n\
    return a";
    expect(util.run(code)).toEqual(['hi', 'hi']);
  });

  it("1 in [1, 2]", function () {
    var code = "\n\
    return 1 in [1, 2]";
    expect(util.run(code)).toEqual(true);
  });

  it("1 not in [1, 2]", function () {
    var code = "\n\
    return 1 not in [1, 2]";
    expect(util.run(code)).toEqual(false);
  });

  it("('a', 4) in [1, 2, ('a', 4)]", function () {
    var code = "\n\
    return ('a', 4) in [1, 2, ('a', 4)]";
    expect(util.run(code)).toEqual(true);
  });

  it("'a' not in [1, 2, ('a', 4)]", function () {
    var code = "\n\
    return 'a' not in [1, 2, ('a', 4)]";
    expect(util.run(code)).toEqual(true);
  });

  it("l[-3]", function () {
    var code = "\n\
    l = [1, 2, 3]\n\
    return l[-3]";
    expect(util.run(code)).toEqual(1);
  });

  it("'a' in [45, 'a', False]", function () {
    var code = "\n\
    return 'a' in [45, 'a', False]";
    expect(util.run(code)).toEqual(true);
  });

  it("if [1, 2, 3]", function () {
    var code = "\
    if [1, 2, 3]: return 'not empty'\n\
    return 'empty'";
    expect(util.run(code)).toBe("not empty");
  });

});
