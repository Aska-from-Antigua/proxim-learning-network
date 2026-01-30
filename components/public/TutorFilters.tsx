'use client';

import { Card, Col, Row, Select, Segmented, Typography } from 'antd';
import { Grade, Subject, Modality } from '@/lib/enums';
import { GradeLabel, SubjectLabel, ModalityLabel } from '@/lib/labels';
import type { ModalityFilter } from '@/lib/helpers/tutor';
import type { RateSort } from '@/lib/helpers/tutor';

const { Text } = Typography;

type Props = {
  subjectFilter: Subject[];
  onSubjectFilterChange: (v: Subject[]) => void;

  gradeFilter: Grade[];
  onGradeFilterChange: (v: Grade[]) => void;

  modalityFilter: ModalityFilter;
  onModalityFilterChange: (v: ModalityFilter) => void;

  sort: RateSort;
  onSortChange: (v: RateSort) => void;

  resultsCount: number;
  totalCount: number;
};

export function TutorFilters(props: Props) {
  return (
    <div className="filtersSticky">
      <Card className="filtersCard">
        <Row gutter={[16, 16]}>
          <Col xs={24} md={6}>
            <Text strong>Subject</Text>
            <Select
              className="filtersControl"
              mode="multiple"
              allowClear
              placeholder="Select subject(s)"
              options={Object.values(Subject).map((s) => ({
                value: s,
                label: SubjectLabel[s],
              }))}
              value={props.subjectFilter}
              onChange={(v) => props.onSubjectFilterChange(v as Subject[])}
            />
          </Col>

          <Col xs={24} md={6}>
            <Text strong>Grade</Text>
            <Select
              className="filtersControl"
              mode="multiple"
              allowClear
              placeholder="Select grade(s)"
              options={Object.values(Grade).map((g) => ({
                value: g,
                label: GradeLabel[g],
              }))}
              value={props.gradeFilter}
              onChange={(v) => props.onGradeFilterChange(v as Grade[])}
            />
          </Col>

          <Col xs={24} md={6}>
            <Text strong>Modality</Text>
            <div className="filtersSegmented">
              <Segmented
                options={[
                  { label: 'Any', value: 'ANY' },
                  { label: ModalityLabel[Modality.Online], value: Modality.Online },
                  { label: ModalityLabel[Modality.InPerson], value: Modality.InPerson },
                ]}
                value={props.modalityFilter}
                onChange={(v) => props.onModalityFilterChange(v as ModalityFilter)}
              />
            </div>
          </Col>

          <Col xs={24} md={6}>
            <Text strong>Sort by rate</Text>
            <Select
              className="filtersControl"
              value={props.sort}
              onChange={(v) => props.onSortChange(v as RateSort)}
              options={[
                { value: 'RATE_DESC', label: 'Highest → Lowest' },
                { value: 'RATE_ASC', label: 'Lowest → Highest' },
              ]}
            />
          </Col>

          <Col xs={24}>
            <Text type="secondary">
              Showing <b>{props.resultsCount}</b> of <b>{props.totalCount}</b>
            </Text>
          </Col>
        </Row>
      </Card>
    </div>
  );
}
