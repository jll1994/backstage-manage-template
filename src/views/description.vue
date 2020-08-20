<template>
    <div>
        <descriptions title="this is a descriptions title" :column="3">
            <descriptionsItem label="UserName">Zhou Maomao</descriptionsItem>
            <descriptionsItem label="Telephone">1810000000</descriptionsItem>
            <descriptionsItem label="Live">Hangzhou, Zhejiang</descriptionsItem>
            <descriptionsItem label="Remark">empty</descriptionsItem>
            <descriptionsItem label="Address" :span="2">No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China</descriptionsItem>
        </descriptions>
        <descriptions title="this is a descriptions title" :column="3" :bordered="true">
            <descriptionsItem label="UserName">Zhou Maomao</descriptionsItem>
            <descriptionsItem label="Telephone">1810000000</descriptionsItem>
            <descriptionsItem label="Live">Hangzhou, Zhejiang</descriptionsItem>
            <descriptionsItem label="Remark">empty</descriptionsItem>
            <descriptionsItem label="Address" :span="2">No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China</descriptionsItem>
        </descriptions>
        <descriptions :column="4" layout="vertical">
            <descriptionsItem label="UserName">Zhou Maomao</descriptionsItem>
            <descriptionsItem label="Telephone">1810000000</descriptionsItem>
            <descriptionsItem label="Live">Hangzhou, Zhejiang</descriptionsItem>
            <descriptionsItem label="Remark">empty</descriptionsItem>
            <descriptionsItem label="Address" :span="2">No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China</descriptionsItem>
        </descriptions>
    </div>
</template>
<script>
export default {
  name: "description",
};
</script>
