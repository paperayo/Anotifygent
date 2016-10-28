# sign
To prevent Malicious modification, every api need to carry a sign using md5, see the sign details as follows.

1. Sequences the key-value pairs in the json you post by sorting keys using the '<' order of ASCII.
2. Iterate over each key-value pairs in order and splice the string of 'key' and 'value' in every item as str1 "key1value1key2value2key3value3...".
3. Add sms_secret to the tail of str1 as str2 "key1value1key2value2key3value3...sms_secret".
4. 'Md5ify' the str2 to generate a 32-bit signature.
5. assign it to the `signature` parameter.
